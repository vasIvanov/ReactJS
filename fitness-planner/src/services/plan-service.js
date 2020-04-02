const planService = {
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
    },
    deletePlan: function(id) {
      return fetch(`http://localhost:9999/api/plan/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      })
    },
    update: function(id, data) {
      return fetch(`http://localhost:9999/api/plan/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(res => res.json());
    }  
};

export default planService;