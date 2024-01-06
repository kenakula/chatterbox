import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/auth/me', () => {
    return HttpResponse.json({ data: { data: { id: '1', username: 'username' } } });
  }),
];
