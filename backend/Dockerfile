# Use Java 17
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy backend code
COPY . .

# Build the app
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Run the jar
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]