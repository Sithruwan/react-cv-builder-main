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