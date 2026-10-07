# ---- build ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
# najpierw sam pom.xml -> cache zależności między buildami
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q package -DskipTests

# ---- runtime ----
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd --system --uid 10001 app
COPY --from=build /src/target/meal-planner.jar meal-planner.jar
USER app
EXPOSE 8080
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
ENTRYPOINT ["java", "-jar", "/app/meal-planner.jar"]
