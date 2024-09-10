import { gsap } from "gsap";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(Flip,ScrollTrigger,ScrollToPlugin,MotionPathPlugin,TextPlugin);



// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Optionally import Bootstrap JavaScript if you need features like modals, dropdowns, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
