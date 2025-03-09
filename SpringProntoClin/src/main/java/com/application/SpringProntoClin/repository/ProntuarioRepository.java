package com.application.SpringProntoClin.repository;

import com.application.SpringProntoClin.domain.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {


    Prontuario findTopByPaciente_IduserOrderByUltimaatualizacaoDesc(Long iduser);
    Prontuario findProntuarioByNumeroprontuario(Long numeroprontuario);

    Optional<Prontuario> findFirstByNumeroprontuarioOrderByUltimaatualizacaoDesc(Long numeroprontuario);
}

