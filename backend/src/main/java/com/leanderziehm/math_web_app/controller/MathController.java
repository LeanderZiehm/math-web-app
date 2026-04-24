package com.leanderziehm.math_web_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leanderziehm.math_web_app.model.MathEntity;
import com.leanderziehm.math_web_app.service.MathService;

@RestController
public class MathController {
    
    @Autowired
    MathService mathService;


    @GetMapping("/submissions")
    List<MathEntity> getSubmissions(){
       return mathService.getMathList();
    }

    @PostMapping("/submit")
    MathEntity addSubmission(@RequestBody MathEntity submission){
        return mathService.saveMath(submission); 
    }

}
