package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class homeController {
    @GetMapping("/")
    public ModelAndView home(){
        ModelAndView mav = new ModelAndView("home");
        return mav;
    }
    @GetMapping("/dashBoard")
    public ModelAndView dashBoard(){
        ModelAndView mav = new ModelAndView("dashBoard");
        return mav;
    }
    @GetMapping("/familyTree")
    public String familyTree(){
        return "familyTree";
    }
    @GetMapping("/inverter")
    public ModelAndView inverter(){
        ModelAndView mav = new ModelAndView("inverter");

        return mav;
    }
    @GetMapping("/chStatus")
    public ModelAndView chStatus(){
        ModelAndView mav = new ModelAndView("ECO_EMS_CONBOX ");
        return mav;
    }

    @GetMapping("/trend")
    public String trend(){
        return "ECO_EMS_TREND ";
    }
    @GetMapping("/report")
    public String report(){
        return "ECO_EMS_REPORT ";
    }
    @GetMapping("/alarm")
    public String alarm(){
        return "ECO_EMS_ALARM ";
    }
    @GetMapping("/alarm2")
    public String alarm2(){
        return "ECO_EMS_ALARM_ANA ";
    }
    @GetMapping("/alarm3")
    public String alarm3(){
        return "ECO_EMS_ALARM_STA ";
    }
    @GetMapping("/ppSetting")
    @ResponseBody
    public ModelAndView ppSetting(){
        ModelAndView mav = new ModelAndView("ECO_EMS_POWER_PLT ");
        return mav;
    }
    @GetMapping("/userSetting")
    @ResponseBody
    public ModelAndView userSetting(){
        ModelAndView mav = new ModelAndView("ECO_EMS_SETTING_USE ");
        return mav;
    }

    @GetMapping("/RTU")
    public ModelAndView RTU(){
        ModelAndView mav = new ModelAndView("ECO_EMS_SETTING_RTU ");
        return mav;
    }

    @GetMapping("/csCenter")
    public String csCenter(){
        return "ECO_EMS_CUSTOMER1 ";
    }

    @GetMapping("/csCenter2")
    public String csCenter2(){
        return "ECO_EMS_CUSTOMER ";
    }




}
