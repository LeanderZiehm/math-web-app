package com.leanderziehm.math_web_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leanderziehm.math_web_app.model.MathEntity;
import com.leanderziehm.math_web_app.model.Operator;

public interface MathRepository extends JpaRepository<MathEntity,Long> {

    List<MathEntity> findByOperator(Operator operator);
}
