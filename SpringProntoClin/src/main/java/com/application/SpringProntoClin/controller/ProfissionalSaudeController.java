package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestProfissionalSaude;
import com.application.SpringProntoClin.domain.Paciente;
import com.application.SpringProntoClin.domain.ProfissionalSaude;
import com.application.SpringProntoClin.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profSaude")
public class ProfissionalSaudeController {

    @Autowired
    private ProfissionalSaudeRepository profissionalSaudeRepository;

    @GetMapping("/me")
    public ProfissionalSaude getProfissionalSaude() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        return profissionalSaudeRepository.findById(profissionalSaude.getIduser()).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
    }

    @PutMapping("/atualiza")
    public ProfissionalSaude updateProfissionalSaude(@RequestBody ProfissionalSaude profissionalSaude) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude prosaude = (ProfissionalSaude) principal;
        ProfissionalSaude profSaude = profissionalSaudeRepository.findById(prosaude.getIduser()).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
        profSaude.setEmail(profissionalSaude.getEmail());
        String encryptPassword = new BCryptPasswordEncoder().encode(profissionalSaude.getSenha());
        profSaude.setSenha(encryptPassword);
        profSaude.setEspecialidademedica(profissionalSaude.getEspecialidademedica());
        profSaude.setTelefoneprofissionalsaude(profissionalSaude.getTelefoneprofissionalsaude());
        profSaude.setStatus("ATIVO");
        return profissionalSaudeRepository.save(profSaude);
    }

    @DeleteMapping("/{idprofissionalSaude}")
    public ProfissionalSaude deleteProfSaude(@PathVariable Long idprofissionalSaude) {
        ProfissionalSaude profSaude = profissionalSaudeRepository.findById(idprofissionalSaude).orElseThrow(() -> new RuntimeException("Profissional de saúde não encontrado"));
        profSaude.setStatus("INATIVO");

        return profissionalSaudeRepository.save(profSaude);
    }
}
