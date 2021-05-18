const danceService = {
  load: function (id, limit, userId, query) {
    return fetch(
      `http://localhost:9999/api/dance${id ? `/${id}` : ''}${
        limit ? `?limit=${limit}` : ''
      }${userId ? `?userId=${userId}` : ''}${query ? `?query=${query}` : ''}`
    ).then((res) => res.json());
  },

  getOne: function (id) {
    return fetch(`http://localhost:9999/api/dance/${id}`).then((res) =>
      res.json()
    );
  },

  postComment: function (data, danceId) {
    return fetch(`http://localhost:9999/api/dance/comment/${danceId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },

  getComments: function (danceId) {
    return fetch(`http://localhost:9999/api/dance/comment/${danceId}`).then(
      (res) => res.json()
    );
  },

  create: function (data) {
    return fetch(`http://localhost:9999/api/dance/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => res.json());
  },

  deleteDance: function (id) {
    return fetch(`http://localhost:9999/api/dance/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
  },

  update: function (id, data) {
    return fetch(`http://localhost:9999/api/dance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export default danceService;
