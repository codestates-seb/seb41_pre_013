package com.primenumber.stackoverflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StackOverflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(StackOverflowApplication.class, args);
	}

}
