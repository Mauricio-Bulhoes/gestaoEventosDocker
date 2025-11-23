export const environment = {
  production: true,
  // Em produção Docker, o frontend acessa o backend via localhost:8080
  // porque as portas estão mapeadas no docker-compose
  apiUrl: 'http://localhost:8080/gestaoEventosBackend'
};