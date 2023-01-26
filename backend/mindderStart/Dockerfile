FROM openjdk:8-alpine
VOLUME /tmp
EXPOSE 9999
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata
