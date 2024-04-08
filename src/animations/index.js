import { easeInOut } from "framer-motion";

export const slideIn = {
    initial: {
        opacity: 0,
        x: -100,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50,
        },
    },
    exit:{
       
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50,
        }
    }
};

export const fadeInOutWithOpacity = {
    initial: {
        opacity: 0,
       
    },
    animate: {
        opacity: 1,
       
    },
    exit:{
       
        opacity: 0,
        
    }
};

export const slideUp = {
    initial: {
        opacity: 0,
        scale:0.6,
        y: 20,
    },
    animate: {
        opacity: 1,
        scale:1,
        y:  0,
    },
    exit:{
       
        opacity: 0,
        scale:0.6,
        y:  20,
    }
};
export const slideUpX = {
    initial: {
        opacity: 0,
        scale:0.6,
        
    },
    animate: {
        opacity: 1,
        scale:1,
      
    },
    exit:{
       
        opacity: 0,
        scale:0.6,
       
    }
};
export const scaleInAndOutBaseOnIndex = (index) => {
    return{
        initial: {
            opacity: 0,
            scale:0.85,
        },
        animate: {
            opacity: 1,
            scale:1,
        },
        exit:{
           
            opacity: 0,
            scale:0.85,
        },
        transition:{
            delay : 0.3 * index,
            ease: easeInOut
        }
    }
}
