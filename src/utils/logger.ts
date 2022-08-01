interface IRequest {
  baseUrl: string;
  method: string;
}

function logger(request: IRequest, children: []) {
  return console.log(
    `${request.baseUrl}, ${request.method}, ${JSON.stringify(children)}`
  );
}

export { logger };
