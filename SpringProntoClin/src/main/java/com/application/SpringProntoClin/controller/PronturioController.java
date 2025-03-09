package com.application.SpringProntoClin.controller;

import com.application.SpringProntoClin.DTO.RequestAdministrador;
import com.application.SpringProntoClin.DTO.RequestProntuario;
import com.application.SpringProntoClin.domain.*;
import com.application.SpringProntoClin.repository.ConsultaRepository;
import com.application.SpringProntoClin.repository.PacienteRepository;
import com.application.SpringProntoClin.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/prontuario")
public class PronturioController {

    @Autowired
    ProntuarioRepository prontuarioRepository;
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private ConsultaRepository consultaRepository;

    public Long gerarCodigoIdentificacao(Paciente paciente) {
        long timestamp = System.currentTimeMillis();
        return Long.parseLong(paciente.getIduser() + String.valueOf(timestamp).substring(5));
    }

    @PostMapping("/adicionarProntuario")
    public ResponseEntity<?> registerProntuario(@RequestBody Prontuario prontuario) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        Paciente paciente = pacienteRepository.findPacienteByCpfpaciente(prontuario.getCpfpaciente());
        if (paciente == null) {
            return ResponseEntity.badRequest().body("Paciente não encontrado");
        }
        Consulta consulta = consultaRepository.findConsultaByDataconsultaAndIdprofissionalsaude(prontuario.getConsulta().getDataconsulta(), profissionalSaude.getIduser());
        if (consulta == null) {
            return ResponseEntity.badRequest().body("Consulta não encontrada");
        }

        Long codigoIdentificacao = gerarCodigoIdentificacao(paciente);
        Prontuario newProntuario = new Prontuario();
        newProntuario.setPaciente(paciente);
        newProntuario.setConsulta(consulta);
        newProntuario.setNumeroprontuario(codigoIdentificacao);
        newProntuario.setCpfpaciente(paciente.getCpfpaciente());
        newProntuario.setHistoricomedico(prontuario.getHistoricomedico());
        newProntuario.setAlergias(prontuario.getAlergias());
        newProntuario.setUltimaatualizacao(prontuario.getUltimaatualizacao());
        newProntuario.setQueixaprinciapal(prontuario.getQueixaprinciapal());
        newProntuario.setDiagnostico(prontuario.getDiagnostico());
        newProntuario.setSituacaotramento(prontuario.getSituacaotramento());
        newProntuario.setPrescricaomedica(prontuario.getPrescricaomedica());

        // Salva o prontuário no banco
        prontuarioRepository.save(newProntuario);

        // Retorna a resposta com o prontuário criado
        return ResponseEntity.ok().body(newProntuario);
    }


    @GetMapping("/meuprontuario")
    public ResponseEntity<?> getMeuprontuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Paciente paciente = (Paciente) principal;
        Prontuario prontuario = prontuarioRepository.findTopByPaciente_IduserOrderByUltimaatualizacaoDesc(paciente.getIduser());
        if(prontuario == null) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        return ResponseEntity.ok().body(prontuario);
    }

    @GetMapping("/prontuarioPaciente")
    public ResponseEntity<?> getProntuarioPaciente(@RequestParam Long numeroprontuario) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;

        Optional<Prontuario> prontuarioOpt = prontuarioRepository.findFirstByNumeroprontuarioOrderByUltimaatualizacaoDesc(numeroprontuario);
        if (!prontuarioOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        Prontuario prontuario = prontuarioOpt.get();
        List<Consulta> consultas = consultaRepository.findConsultaByIdpacienteAndIdprofissionalsaude(
                prontuario.getPaciente().getIduser(),
                profissionalSaude.getIduser()
        );
        if (consultas == null || consultas.isEmpty()) {
            return ResponseEntity.badRequest().body("Você não tem acesso a este prontuário, nenhuma consulta encontrada.");
        }

        return ResponseEntity.ok().body(prontuario);
    }



    @PostMapping("/atualizarProntuario")
    public ResponseEntity<?> atualizarProntuario(@RequestBody Prontuario prontuario) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        ProfissionalSaude profissionalSaude = (ProfissionalSaude) principal;
        Optional<Prontuario> prontuarioOpt = prontuarioRepository.findFirstByNumeroprontuarioOrderByUltimaatualizacaoDesc(prontuario.getNumeroprontuario());
        if (!prontuarioOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Prontuário não encontrado");
        }
        Prontuario antigoProntuario = prontuarioOpt.get();
        Consulta consulta = consultaRepository.findConsultaByDataconsultaAndIdprofissionalsaude(prontuario.getConsulta().getDataconsulta(), profissionalSaude.getIduser());
        if (consulta == null) {
            return ResponseEntity.badRequest().body("Consulta não encontrada");
        }
        List<Consulta> consultas = consultaRepository.findConsultaByIdconsultaAndIdprofissionalsaude(
                consulta.getIdconsulta(),
                profissionalSaude.getIduser()
        );
        if (consultas == null || consultas.isEmpty()) {
            return ResponseEntity.badRequest().body("Você não tem acesso a este prontuário");
        }
        Paciente paciente = pacienteRepository.findPacienteByCpfpaciente(prontuario.getPaciente().getCpfpaciente());
        if (paciente == null) {
            return ResponseEntity.badRequest().body("Paciente não encontrado");
        }

        Prontuario newProntuario = new Prontuario();
        newProntuario.setPaciente(paciente);
        newProntuario.setConsulta(consulta);
        newProntuario.setNumeroprontuario(antigoProntuario.getNumeroprontuario());
        newProntuario.setCpfpaciente(paciente.getCpfpaciente());
        newProntuario.setHistoricomedico(prontuario.getHistoricomedico());
        newProntuario.setAlergias(prontuario.getAlergias());
        newProntuario.setUltimaatualizacao(prontuario.getUltimaatualizacao());
        newProntuario.setQueixaprinciapal(prontuario.getQueixaprinciapal());
        newProntuario.setDiagnostico(prontuario.getDiagnostico());
        newProntuario.setPrescricaomedica(prontuario.getPrescricaomedica());
        newProntuario.setSituacaotramento(prontuario.getSituacaotramento());
        prontuarioRepository.save(newProntuario);
        return ResponseEntity.ok().body(prontuario);
    }

}
