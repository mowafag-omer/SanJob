const decodeToken = (token: string) => {
  var encodedPayload = token.split('.')[1];
  return JSON.parse(atob(encodedPayload));
}

export default decodeToken