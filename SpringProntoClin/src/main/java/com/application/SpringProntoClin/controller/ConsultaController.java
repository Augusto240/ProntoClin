package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestConsulta;
import com.application.SpringProntoClin.domain.Consulta;
import com.application.SpringProntoClin.domain.Paciente;
import com.application.SpringProntoClin.domain.ProfissionalSaude;
import com.application.SpringProntoClin.repository.ConsultaRepository;
import com.application.SpringProntoClin.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private ProfissionalSaudeRepository profissionalSaudeRepository;

    @PostMapping
    public ResponseEntity registrarConsulta(@RequestBody RequestConsulta consulta) {
        ProfissionalSaude profissional = profissionalSaudeRepository.findById(consulta.idProfissionalSaude()).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
        if (Objects.equals(profissional.getStatus(), "INATIVO")){
            return ResponseEntity.badRequest().body( "Profissional não está ativo.");
        }
        if (!consultaRepository.findConsultaByIdpacienteAndDataconsulta(consulta.idPaciente(), consulta.dataConsulta()).isEmpty()){
            return ResponseEntity.badRequest().body("Paciente já possui uma consulta agendada para este dia");
        }
        if(!consultaRepository.findConsultaByIdprofissionalsaudeAndDataconsulta(consulta.idProfissionalSaude(), consulta.dataConsulta()).isEmpty()){
            return ResponseEntity.badRequest().body("Profissional não disponível para esta data e hora");
        }
        else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Object principal = authentication.getPrincipal();
            Consulta newConsulta = new Consulta(consulta);
            Paciente paciente = (Paciente) principal;
            newConsulta.setIdpaciente(paciente.getIduser());


            consultaRepository.save(newConsulta);

            return new ResponseEntity<>(newConsulta, HttpStatus.CREATED);
        }
    }

    @GetMapping("/profissional/consultas")
    public ResponseEntity<List<Consulta>> getConsultasByProfissionalId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        List<Consulta> consultas = consultaRepository.findConsultaByIdprofissionalsaude(profissionalSaude.getIduser());
        if (consultas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/paciente/consultas")
    public ResponseEntity<List<Consulta>> getConsultasByPacienteId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        List<Consulta> consultas = consultaRepository.findConsultaByIdpaciente(paciente.getIduser());
        if (consultas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(consultas);
    }

    @PutMapping("/{idconsulta}")
    public ResponseEntity<Object> getConsulta(@PathVariable Long idconsulta, @RequestBody Consulta consulta) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        if (!consulta.getIdpaciente().equals(paciente.getIduser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Consulta Consulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        Consulta.setDataconsulta(consulta.getDataconsulta());
        return ResponseEntity.ok().body(consultaRepository.save(Consulta));
    }

    @DeleteMapping("/{idconsulta}")
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long idconsulta) {
        Consulta consulta = consultaRepository.findById(idconsulta).orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        if (!consulta.getIdpaciente().equals(paciente.getIduser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        consultaRepository.delete(consulta);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
