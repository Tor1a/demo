package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class homeController {
    @GetMapping("/")
    public String home(){
        return "home";
    }
    @GetMapping("/familyTree")
    public String familyTree(){
        return "familyTree";
    }
    @GetMapping("/invert")
    public String invert(){
        return "invert";
    }
    @GetMapping("/chStatus")
    public String chStatus(){
        return "chStatus";
    }

    @GetMapping("/trend")
    public String trend(){
        return "trend";
    }
    @GetMapping("/report")
    public String report(){
        return "report";
    }
    @GetMapping("/alarm")
    public String alarm(){
        return "alarm";
    }
    @GetMapping("/setting")
    public String setting(){
        return "powerPlantsStting";
    }
    @GetMapping("/csCenter2")
    public String csCenter(){
        return "csCenter2";
    }

    @GetMapping("/userSetting")
    public String userSetting(){
        return "userSetting";
    }

    @GetMapping("/RTU")
    public String RTU(){
        return "RTU";
    }
}
