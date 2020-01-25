const postService = {
    load: function(id, limit, userId, query) {
        return fetch(`http://localhost:9999/api/plan${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}${userId ? `?userId=${userId}` : ''}${query ? `?query=${query}` : ''}`).then(res => res.json());
    },
    create: function(data) {
        return fetch(`http://localhost:9999/api/plan/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        }).then(res => res.json());
    }  
};

export default postService;