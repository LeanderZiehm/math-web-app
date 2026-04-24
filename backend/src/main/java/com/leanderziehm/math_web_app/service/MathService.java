package com.leanderziehm.math_web_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leanderziehm.math_web_app.model.MathEntity;
import com.leanderziehm.math_web_app.model.Operator;
import com.leanderziehm.math_web_app.repository.MathRepository;

@Service
public class MathService {

    @Autowired
    MathRepository mathRepository;

    public List<MathEntity> getMathList() {
        return mathRepository.findAll();
    }

    public List<MathEntity> getMathListOperator(Operator operator){
        return mathRepository.findByOperator(operator);
    }

    public MathEntity saveMath(MathEntity mathEntity) {
        return mathRepository.save(mathEntity);
    }

}
