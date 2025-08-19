export const WorkPath = {
    // Auth
    LOGIN: { url: '/api/login', description: 'Login' },
    REGISTER: { url: '/api/register', description: 'Register' },
  
    // Users
    USERS_ROOT: { url: '/api/users', description: 'Users collection' },
    USER_BY_ID: (id) => ({ url: `/api/users/${id}`, description: `User by id=${id}` }),
    USERS_DELAY: (sec) => ({ url: `/api/users?delay=${sec}`, description: `Users with delay=${sec}` }),
  
    // Unknown resources
    RESOURCES_ROOT: { url: '/api/unknown', description: 'Resources collection' },
    RESOURCE_BY_ID: (id) => ({ url: `/api/unknown/${id}`, description: `Resource by id=${id}` })
  };
  