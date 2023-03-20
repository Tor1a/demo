package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class homeController {
    @GetMapping("/")
    public String home(){
        ModelAndView mav = new ModelAndView("powerPlantsSetting");
        System.out.println(mav);
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
    @GetMapping("/alarm2")
    public String alarm2(){
        return "alarm2";
    }
    @GetMapping("/alarm3")
    public String alarm3(){
        return "alarm3";
    }
    @GetMapping("/ppSetting")
    @ResponseBody
    public ModelAndView ppSetting(){
        ModelAndView mav = new ModelAndView("powerPlantsSetting");
        return mav;
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
