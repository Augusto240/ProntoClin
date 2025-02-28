package com.application.SpringProntoClin.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idProntuario")
@Entity (name = "prontuario")
@Table (name = "prontuario")
public class Prontuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prontuario_seq_generator")
    @SequenceGenerator(name = "prontuario_seq_generator", sequenceName = "prontuario_SEQ", allocationSize = 1)
    private Long idProntuario;
    private Long idPaciente;
    private Date dataCriacao;
    private Date dataUltimaAtualizacao;
}
