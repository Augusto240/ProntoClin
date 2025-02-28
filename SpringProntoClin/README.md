# Aplicação SpringBoot

### Endpoints e exemplos de requisição

Acesso a página home
```
http://localhost:8080/
```

Login POST
```
http://localhost:8081/auth/login
```

Requisições POST
```
http://localhost:8081/auth/register/adm
```
```
http://localhost:8081/auth/register/paciente
```
```
http://localhost:8081/auth/register/prosaude
```
```
http://localhost:8080/consulta
```

### Requisições GET
Só retornam dados do usuário logado no sistema

```
http://localhost:8080/adm/me
```
```
http://localhost:8080/paciente/me
```
```
http://localhost:8080/profSaude/me
```
```
http://localhost:8080/consulta/profissional/consultas
```
```
http://localhost:8080/consulta/paciente/consultas
```

Requisições PUT
Só realiza o update de dados do usuário logado no sistema

```
http://localhost:8080/adm/atualiza
```
```
http://localhost:8080/paciente/atualiza
```
```
http://localhost:8080/profSaude/atualiza
```
```
http://localhost:8080/consulta/{idConsulta}
```

Requisições DELETE

```
http://localhost:8080/profSaude/{idProfissionalSaude}
```
```
http://localhost:8080/consulta/{idConsulta}
```
