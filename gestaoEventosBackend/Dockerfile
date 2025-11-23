# ========================================
# ESTÁGIO 1: BUILD (Compilação)
# ========================================
# Usa Maven + JDK 17 para compilar o projeto
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimização de cache)
# Se o pom.xml não mudar, o Docker reutiliza esta camada
COPY pom.xml .

# Baixa as dependências do Maven (isso fica em cache)
RUN mvn dependency:go-offline -B

# Agora copia todo o código fonte
COPY src ./src

# Compila o projeto e gera o arquivo .war
# -DskipTests pula os testes para acelerar o build (remova se quiser rodar testes)
RUN mvn clean package -DskipTests

# ========================================
# ESTÁGIO 2: RUNTIME (Execução)
# ========================================
# Usa apenas o JRE 17 (mais leve que o JDK completo)
FROM eclipse-temurin:17-jre-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo .war compilado do estágio anterior
# O Maven gera o .war dentro de /app/target/
COPY --from=build /app/target/gestaoEventosBackend-*.war app.war

# Expõe a porta 8080 (mesma configurada no Spring Boot)
EXPOSE 8080

# Comando para executar a aplicação
# java -jar executa o arquivo .war como aplicação standalone
ENTRYPOINT ["java", "-jar", "app.war"]