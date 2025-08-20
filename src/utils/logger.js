import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/** Sanitize any string for safe file names across OSes */
function safe(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]/g, '_');
}

export class Logger {
  constructor(testInfo, { level = process.env.LOG_LEVEL || 'info' } = {}) {
    this.testInfo = testInfo;
    this.level = level;
    this.lines = [];
    // One combined file per test in Playwright's per-test output dir
    // (Playwright ensures this dir exists)
    this.filePath = path.join(testInfo.outputDir, `${safe(testInfo.title)}.log`);
  }

  // ---------- public API ----------
  debug(msg, data)   { this.#line('debug', msg, data, chalk.gray); }
  info(msg, data)    { this.#line('info',  msg, data, chalk.cyan); }
  warn(msg, data)    { this.#line('warn',  msg, data, chalk.yellow); }
  error(msg, data)   { this.#line('error', msg, data, chalk.red); }

  request(method, url, body) {
    const color =
      method === 'GET'    ? chalk.blueBright  :
      method === 'POST'   ? chalk.greenBright :
      method === 'PUT'    ? chalk.yellowBright:
      method === 'PATCH'  ? chalk.magentaBright :
      method === 'DELETE' ? chalk.redBright   : chalk.white;

    this.#line(
      'request',
      `${method} ${url}`,
      body ?? undefined,
      color
    );
  }

  response(status, body) {
    const color =
      status >= 500 ? chalk.red :
      status >= 400 ? chalk.yellow :
      status >= 200 ? chalk.green :
                      chalk.white;

    this.#line('response', `Status ${status}`, body ?? undefined, color);
  }

  /** Write a single combined file and attach it to the report */
  async attach(name = 'HTTP log') {
    try {
      const content = this.lines.join('\n') + '\n';
      // Ensure parent dir exists (should already, but just in case)
      fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
      fs.writeFileSync(this.filePath, content, 'utf8');

      await this.testInfo.attach(name, {
        path: this.filePath,
        contentType: 'text/plain',
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to attach log:', err);
    }
  }

  // ---------- internals ----------
  #line(level, message, data, colorize = (s) => s) {
    const ts = new Date().toISOString();
    const pretty =
      data === undefined
        ? `${colorize(`[${ts}] [${level.toUpperCase()}] ${message}`)}`
        : `${colorize(`[${ts}] [${level.toUpperCase()}] ${message}`)}\n${chalk.gray(
            typeof data === 'string' ? data : JSON.stringify(data, null, 2)
          )}`;

    // Console echo (colored)
    // eslint-disable-next-line no-console
    console.log(pretty);

    // Plain text persisted (no ANSI) for the file/attachment
    const plain =
      data === undefined
        ? `[${ts}] [${level.toUpperCase()}] ${message}`
        : `[${ts}] [${level.toUpperCase()}] ${message}\n${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`;

    this.lines.push(plain);
  }
}

/** convenience factory */
export const createLogger = (testInfo, opts) => new Logger(testInfo, opts);