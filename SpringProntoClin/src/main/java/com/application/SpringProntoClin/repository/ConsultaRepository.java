package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long>{


    List<Consulta> findConsultaByIdprofissionalsaude(Long idprofissionalsaude);
    List<Consulta> findConsultaByIdpaciente(Long idpaciente);
    List<Consulta> findConsultaByIdpacienteAndDataconsulta(Long idpaciente, Date dataConsulta);
    List<Consulta> findConsultaByIdprofissionalsaudeAndDataconsulta(Long idprofissionalsaude, Date dataConsulta);

}
