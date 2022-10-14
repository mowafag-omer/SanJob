const decodeToken = (token: string) => {
  const encodedPayload = token.split('.')[1];
  return JSON.parse(atob(encodedPayload));
}

export default decodeToken