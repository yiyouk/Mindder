FROM openjdk:8-alpine
CMD["./mvnw","clean","package"]
EXPOSE 9999
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata
