# -------- BUILD STAGE --------
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom and wrapper first (for caching)
COPY backend/pom.xml backend/mvnw backend/.mvn ./backend/

# Switch into the backend folder
WORKDIR /app/backend
RUN mvn -B dependency:go-offline

# --- FIX IS HERE ---
# Copy the CONTENTS of the local 'backend' folder into the current directory (/app/backend)
COPY backend . 

RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]