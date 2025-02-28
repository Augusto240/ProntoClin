package com.application.SpringProntoClin.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues()))
                .authorizeHttpRequests(auth -> auth
                        // Garantir que as rotas de registro sejam permitidas antes de qualquer outra regra
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register/prosaude").permitAll()
    
                        // Outras regras de acesso
                        .requestMatchers(HttpMethod.GET, "/").permitAll()
                        .requestMatchers(HttpMethod.GET, "/paciente/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.PUT, "/paciente/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.DELETE, "/paciente/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.GET, "/adm/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/adm/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/profSaude/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/consulta/paciente/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.POST, "/consulta/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.PUT, "/consulta/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.DELETE, "/consulta/**").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.GET, "/profSaude/**").hasRole("PROFSAUDE")
                        .requestMatchers(HttpMethod.PUT, "/profSaude/**").hasRole("PROFSAUDE")
                        .requestMatchers(HttpMethod.GET, "/consulta/profissional/**").hasRole("PROFSAUDE")
    
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Permite apenas o frontend local
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
