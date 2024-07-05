export const generateUniqueId  =(length:number = 5)=> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';
  for (let i = 0; i < length; i++) {
      uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uniqueId;
}

type HttpMethod = 'GET' | 'POST';
type Headers = { [key: string]: string };
type Body = Record<string, unknown> | undefined;

const _request = async (url: string, method: HttpMethod, body: Body = {}, headers: Headers = {}): Promise<any> => {
    headers['Content-Type'] = 'application/json';

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data
  }

export const request = {
  post: async (url: string, body: Body = {}, headers: Headers = {}): Promise<any> => {
    return _request(url, 'POST', body, headers);
  },
  get: async (url: string, headers: Headers = {}): Promise<any> => {
    return _request(url, 'GET', undefined, headers);
  },
};


export const createAvatar = (name: string)=>{
  if (!name) return 'USER';

  const parts = name.split(' ');
  const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
}