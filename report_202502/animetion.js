window.addEventListener("load", function() {
    const topContent = document.getElementById("topContent");
    const addImage1 = topContent.querySelector(".addImage1");
    const canImage = document.getElementById("canImage");
    const addImage2 = topContent.querySelector(".addImage2");
    const content1 = document.getElementById("content1");
    const content2 = document.getElementById("content2");
    const content3 = document.getElementById("content3");
    const content5 = document.getElementById("content5");
    const content9 = document.getElementById("content9");
    const content10 = document.getElementById("content10");
    const content11 = document.getElementById("content11");
    const content13 = document.getElementById("content13");
    const content15 = document.getElementById("content15");
    const content16 = document.getElementById("content16");
    const content19 = document.getElementById("content19");
    const content21 = document.getElementById("content21");
    const content22 = document.getElementById("content22");
    const content23 = document.getElementById("content23");
    const content24 = document.getElementById("content24");

    const ClashInterval = 50;

    let canIsClash = false;

    function canClash(interval) {
        canIsClash = true
        canImage.src = "medias/Can.svg"
        setTimeout(() => {
            canImage.src = "medias/Can_Clash1.svg"
        }, interval * 1);
        setTimeout(() => {
            canImage.src = "medias/Can_Clash2.svg"
        }, interval * 2);
    }

    function canClashReverse(interval) {
        canIsClash = false;
        canImage.src = "medias/Can_Clash2.svg"
        setTimeout(() => {
            canImage.src = "medias/Can_Clash1.svg"
        }, interval * 1);
        setTimeout(() => {
            canImage.src = "medias/Can_Open.svg"
        }, interval * 2);
    }

    function canClashReverseLid(interval) {
        canIsClash = false;
        canImage.src = "medias/Can_Clash2.svg"
        setTimeout(() => {
            canImage.src = "medias/Can_Clash1.svg"
        }, interval * 1);
        setTimeout(() => {
            addImage1.innerHTML += "<img class='tripod' src='medias/Tripod.svg'>";
            addImage1.innerHTML += "<img class='fire' src='medias/Fire.svg'>";
            addImage1.innerHTML += "<img class='bucketwater' src='medias/BucketWater.svg'>";
            addImage2.innerHTML += "<img class='bucketwater2' src='medias/BucketWater2.svg'>";
            addImage2.innerHTML += "<img class='lid' src='medias/Can_Lid.svg'>";
            canImage.src = "medias/Can_Open.svg"
            addImage2.innerHTML += "<img class='water' src='medias/Water.svg'>";
            addImage2.innerHTML += "<img class='hotwater' src='medias/HotWater.svg'>";
            addImage2.innerHTML += "<img class='grain' src='medias/Grain.svg'>";
            addImage2.innerHTML += "<img class='air' src='medias/Air.svg'>";
            addImage2.innerHTML += "<img class='hotair' src='medias/HotAir.svg'>";
            addImage2.innerHTML += "<img class='h2o' src='medias/H2O.svg'>";
            addImage2.innerHTML += "<img class='h2o2' src='medias/H2O.svg'>";
            addImage2.innerHTML += "<img class='rightarrow' src='medias/Arrow.svg'>";
            addImage2.innerHTML += "<img class='leftarrow' src='medias/Arrow.svg'>";
            addImage2.innerHTML += "<img class='outsideleftarrow' src='medias/HotArrow.svg'>";
            addImage2.innerHTML += "<img class='outsiderightarrow' src='medias/HotArrow.svg'>";
        }, interval * 2);
    }

    topCanClashPlay = true;

    setTimeout(() => {
        if (window.scrollY <= 100 && topCanClashPlay) {
            canClash(ClashInterval);
            setTimeout(() => {
                canClash(0);
            }, ClashInterval * 2);
        }
    }, 1000);

    function opacityAnimetion(object,opacity) {
        if (opacity == 1) {
            object.classList.remove("opacityMinAnimetion");
            object.classList.add("opacityMaxAnimetion");
        } else if (opacity == 0) {
            object.classList.remove("opacityMaxAnimetion");
            object.classList.add("opacityMinAnimetion");
        }
    }

    // function GrainVibrationSpeed(fromN,to,object) {
    //     let from = fromN;
    //     if (fromN == "n") {
    //         from = object.style.animationDuration.replace("s","");
    //     }
    //     let moreThanFrom = false;
    //     if (from > to) {
    //         moreThanFrom = true;
    //     }
    //     let roop = from;
    //     let roopInterval = setInterval(() => {
    //         if (moreThanFrom && roop <= to || !moreThanFrom && roop > to) {
    //             clearInterval(roopInterval);
    //             // addImage2.querySelector(".h2o").style.animationDuration = ".8s";
    //         } else {
    //             if (moreThanFrom) {
    //                 roop = Math.floor((roop - .0001) * 1000) / 1000;
    //             } else {
    //                 roop = Math.floor((roop + .0001) * 1000) / 1000;
    //             }
    //             object.style.animationDuration = `${roop}s`;
    //         }
    //         // console.log(roop);
    //     },1)
    // }
    // GrainVibrationSpeed(1.6,.8,addImage2.querySelector(".h2o"))
    // GrainVibrationSpeed(.8,1.6,addImage2.querySelector(".h2o"))

    function lidOpen() {
        addImage2.querySelector(".lid").classList.add("lidOpenAnimetion");
        addImage2.querySelector(".lid").classList.remove("lidCloseAnimetion");
    }

    function lidClose() {
        addImage2.querySelector(".lid").classList.add("lidCloseAnimetion");
        addImage2.querySelector(".lid").classList.remove("lidOpenAnimetion");
    }

    function lidOpacityMin() {
        addImage2.querySelector(".lid").classList.add("opacityMin");
        addImage2.querySelector(".lid").classList.remove("opacityMax");
        addImage2.querySelector(".lid").classList.remove("lidCloseAnimetion");
    }

    function lidOpacityMax() {
        addImage2.querySelector(".lid").classList.add("opacityMax");
        addImage2.querySelector(".lid").classList.remove("opacityMin");
        addImage2.querySelector(".lid").classList.remove("lidCloseAnimetion");
    }

    let tripodIsAdd = false;

    function addTripod() {
        tripodIsAdd = true;
        addImage1.querySelector(".tripod").classList.add("tripodAddAnimetion");
        addImage1.querySelector(".tripod").classList.remove("tripodRemoveAnimetion");
    }

    function removeTripod() {
        tripodIsAdd = false;
        addImage1.querySelector(".tripod").classList.remove("tripodAddAnimetion");
        addImage1.querySelector(".tripod").classList.add("tripodRemoveAnimetion");
    }

    let fireIsAdd = false;

    function addFire() {
        fireIsAdd = true;
        addImage1.querySelector(".fire").classList.remove("fireRemoveAnimetion");
        addImage1.querySelector(".fire").classList.add("fireAddAnimetion");
    }

    function removeFire() {
        fireIsAdd = false;
        addImage1.querySelector(".fire").classList.remove("fireAddAnimetion");
        addImage1.querySelector(".fire").classList.add("fireRemoveAnimetion");
    }

    let bucketwaterIsAdd = false;

    function addBucketWater() {
        bucketwaterIsAdd = true;
        addImage1.querySelector(".bucketwater").classList.add("bucketWaterAddAnimetion");
        addImage1.querySelector(".bucketwater").classList.remove("bucketWaterRemoveAnimetion");
        addImage2.querySelector(".bucketwater2").classList.add("bucketWater2AddAnimetion");
        addImage2.querySelector(".bucketwater2").classList.remove("bucketWater2RemoveAnimetion");
    }

    function removeBucketWater() {
        bucketwaterIsAdd = false;
        addImage1.querySelector(".bucketwater").classList.add("bucketWaterRemoveAnimetion");
        addImage1.querySelector(".bucketwater").classList.remove("bucketWaterAddAnimetion");
        addImage2.querySelector(".bucketwater2").classList.add("bucketWater2RemoveAnimetion");
        addImage2.querySelector(".bucketwater2").classList.remove("bucketWater2AddAnimetion");
    }

    function addWater() {
        addImage2.querySelector(".water").classList.add("waterAddAnimetion");
    }

    function removeWater() {
        addImage2.querySelector(".water").classList.add("opacityMinAnimetion");
        addImage2.querySelector(".water").classList.remove("waterAddAnimetion");
    }

    hotWaterIsAdd = false;

    function addHotWater() {
        hotWaterIsAdd = true;
        addImage2.querySelector(".hotwater").classList.add("waterAddAnimetion");
    }

    function removeHotWater() {
        hotWaterIsAdd = false;
        addImage2.querySelector(".hotwater").classList.add("opacityMinAnimetion");
        addImage2.querySelector(".hotwater").classList.remove("waterAddAnimetion");
    }

    function addAir() {
        addImage2.querySelector(".air").classList.add("waterAddAnimetion");
    }

    function removeAir() {
        addImage2.querySelector(".air").classList.add("opacityMinAnimetion");
        addImage2.querySelector(".air").classList.remove("waterAddAnimetion");
    }

    function addCompressAir() {
        addImage2.querySelector(".air").classList.remove("waterAddAnimetion");
        addImage2.querySelector(".air").classList.add("compressAirAnimetion");
    }

    function removeCompressAir() {
        addImage2.querySelector(".air").classList.add("RemoveAnimetion");
        addImage2.querySelector(".air").classList.remove("compressAirAnimetion");
        addImage2.querySelector(".air").classList.remove("waterAddAnimetion");
    }

    function addHotAir() {
        addImage2.querySelector(".hotair").classList.add("waterAddAnimetion");
    }

    function removeHotAir() {
        addImage2.querySelector(".hotair").classList.add("opacityMinAnimetion");
        addImage2.querySelector(".hotair").classList.remove("waterAddAnimetion");
        // addImage2.querySelector(".hotair").classList.add("waterRemoveAnimetion");
    }

    function canOpacityHalf() {
        canImage.classList.remove("opacityDefaultAnimetion");
        canImage.classList.add("opacityHalfAnimetion");
    }

    function canOpacityDefault() {
        canImage.classList.remove("opacityHalfAnimetion");
        canImage.classList.add("opacityDefaultAnimetion");
    }

    let grain_1IsAnimetion = false;

    function grain_1AnimetionStart() {
        grain_1IsAnimetion = true;
        addImage2.querySelector(".grain").classList.add("GrainAnimetions", "grain_1Animetion");
    }

    function grain_1AnimetionStop() {
        grain_1IsAnimetion = false;
        addImage2.querySelector(".grain").classList.remove("GrainAnimetions", "grain_1Animetion");
    }

    function h2oAnimetionStart() {
        addImage2.querySelector(".h2o").classList.remove("grain_1SlowAnimetion");
        addImage2.querySelector(".h2o").classList.add("GrainAnimetions", "grain_1Animetion");
    }

    function h2oSlowAnimetionStart() {
        addImage2.querySelector(".h2o").classList.add("grain_1SlowAnimetion");
        addImage2.querySelector(".h2o").classList.remove("grain_1Animetion");
    }

    function h2oAnimetionStop() {
        addImage2.querySelector(".h2o").classList.remove("grain_1SlowAnimetion");
        addImage2.querySelector(".h2o").classList.remove("grain_1Animetion");
    }

    function canVibrationStart() {
        canImage.classList.add("canVibration");
    }

    function canVibrationStop() {
        canImage.classList.remove("canVibration");
    }

    function arrowCompressStart() {
        addImage2.querySelector(".rightarrow").classList.add("rightArrowCompressAnimetion");
        addImage2.querySelector(".leftarrow").classList.add("leftArrowCompressAnimetion");
        addImage2.querySelector(".outsiderightarrow").classList.add("rightArrowSpreadAnimetion");
        addImage2.querySelector(".outsideleftarrow").classList.add("leftArrowSpreadAnimetion");
    }

    function arrowCompressStop() {
        addImage2.querySelector(".rightarrow").classList.remove("rightArrowCompressAnimetion");
        addImage2.querySelector(".leftarrow").classList.remove("leftArrowCompressAnimetion");
        addImage2.querySelector(".outsiderightarrow").classList.remove("rightArrowSpreadAnimetion");
        addImage2.querySelector(".outsideleftarrow").classList.remove("leftArrowSpreadAnimetion");
    }

    function arrowSpreadStart() {
        addImage2.querySelector(".outsiderightarrow").style.visibility = "";
        addImage2.querySelector(".outsideleftarrow").style.visibility = "";
    }

    function arrowSpreadStop() {
        addImage2.querySelector(".outsiderightarrow").style.visibility = "hidden";
        addImage2.querySelector(".outsideleftarrow").style.visibility = "hidden";
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY == 0) {
            if (canIsClash) {
                canClashReverseLid();
            }
            if (hotWaterIsAdd) {
                removeHotWater();
            }
            if (grain_1IsAnimetion) {
                grain_1AnimetionStop();
            }
            if (fireIsAdd) {
                removeFire();
            }
            if (bucketwaterIsAdd) {
                removeBucketWater();
            }
            if (tripodIsAdd) {
                removeTripod();
            }
        }
    });

    function scrollEvent_Top(content, scrollThreshold) {
        let executed = false; // 1回だけ実行するためのフラグ
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true; // 再実行を防ぐ
                canClashReverseLid();
                topCanClashPlay = false;
            }
            // 缶を潰す
        });
    }

    function scrollEvent_Content1_1(content, scrollThreshold) {
        let executed = false; 
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    lidOpen();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                lidClose();
            }
            // 缶を戻す､缶を開ける
        });
    }

    function scrollEvent_Content1_2(content, scrollThreshold) {
        let executed = false; 
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true; 
                setTimeout(() => {
                    addWater();
                    canOpacityHalf();
                    addTripod();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                removeWater();
                canOpacityDefault();
                removeTripod();
            }
            // 水を追加
        });
    }

    function scrollEvent_Content2_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    addFire();
                    addHotWater();
                    canVibrationStart();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                removeFire();
                removeHotWater();
                canVibrationStop();
            }
            // 火を付ける
        });
    }

    function scrollEvent_Content2_2(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    removeTripod();
                    removeFire();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                addTripod();
                addFire();
            }
            // 水を温める
        });
    }

    function scrollEvent_Content2_3(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    lidClose();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                lidOpen();
            }
            // 粒を揺らす
        });
    }

    function scrollEvent_Content3_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    grain_1AnimetionStart();
                    addBucketWater();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                grain_1AnimetionStop();
                removeBucketWater();
            }
            // フタを閉める
        });
    }

    function scrollEvent_Content3_2(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    removeHotWater();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                addHotWater();
            }
            // 水を冷やす
        });
    }

    function scrollEvent_Content3_3(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    lidOpacityMin();
                    canClash(ClashInterval);
                    grain_1AnimetionStop();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                lidOpacityMax();
                lidClose();
                grain_1AnimetionStart();
                canClashReverse(ClashInterval);
            }
            // 缶を潰す
        });
    }

    function scrollEvent_Content5_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    canClashReverse(ClashInterval);
                    addHotAir();
                    addHotWater();
                    removeBucketWater();
                    addTripod();
                    addFire();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                canClash(ClashInterval);
                removeHotWater();
                removeHotAir();
                addBucketWater();
                removeTripod();
                removeFire();
            }
        });
    }

    function scrollEvent_Content9_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    // addImage2.querySelector(".hotwater").classList.add("opacityMinAnimetion");
                    // addImage2.querySelector(".water").classList.add("opacityMinAnimetion");
                    // addImage2.querySelector(".lid").classList.remove("opacityMin");
                    removeHotWater();
                    removeWater();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                addHotWater();
                addImage2.querySelector(".hotwater").classList.add("opacityMin");
                lidOpacityMin();
            }
        });
    }

    function scrollEvent_Content10_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    lidClose();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                lidOpen();
            }
        });
    }

    function scrollEvent_Content11_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    h2oAnimetionStart();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                h2oAnimetionStop()
            }
        });
    }

    function scrollEvent_Content13_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    lidClose();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                lidOpen();
                h2oAnimetionStop();
            }
        });
    }

    function scrollEvent_Content16_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    h2oSlowAnimetionStart();
                    removeTripod();
                    removeFire();
                    addBucketWater();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                h2oAnimetionStart();
                addTripod();
                addFire();
                removeBucketWater();
            }
        });
    }

    function scrollEvent_Content16_2(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    removeHotAir();
                    addCompressAir();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                addHotAir();
                removeCompressAir();
            }
        });
    }

    function scrollEvent_Content19_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    removeCompressAir();
                    arrowCompressStart();
                    arrowSpreadStop();
                    h2oAnimetionStop();
                }, 100);
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                arrowCompressStop();
                h2oSlowAnimetionStart();
                addCompressAir();
            }
        });
    }

    function scrollEvent_Content22_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    arrowSpreadStart();
                }, 100)
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                arrowSpreadStop();
            }
        });
    }

    function scrollEvent_Content23_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    canClash(ClashInterval);
                    lidOpacityMin();
                    arrowCompressStop();
                    arrowSpreadStart();
                    h2oAnimetionStop();
                    canOpacityDefault();
                }, 100)
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                canClashReverse(ClashInterval);
                lidClose();
                arrowCompressStart();
                canOpacityHalf();
            }
        });
    }

    function scrollEvent_Content24_1(content, scrollThreshold) {
        let executed = false;
        window.addEventListener("scroll", () => {
            let contentScroll = -content.getBoundingClientRect().top;
            let contentScrollRatio = contentScroll / window.innerHeight + 1;

            // console.log(contentScrollRatio);
            if (!executed && contentScrollRatio >= scrollThreshold) {
                executed = true;
                setTimeout(() => {
                    removeBucketWater();
                }, 100)
            } else if (executed && contentScrollRatio < scrollThreshold) {
                executed = false;
                addBucketWater();
            }
        });
    }

    scrollEvent_Top(topContent, 1.2);
    scrollEvent_Content1_1(content1, .5);
    scrollEvent_Content1_2(content1, .8);
    scrollEvent_Content2_1(content2, .3);
    scrollEvent_Content2_2(content2, .9);
    scrollEvent_Content2_3(content2, 1);
    scrollEvent_Content3_1(content3, .1);
    scrollEvent_Content3_2(content3, .2);
    scrollEvent_Content3_3(content3, .7);
    scrollEvent_Content5_1(content5, .7);
    scrollEvent_Content9_1(content9, .7);
    scrollEvent_Content10_1(content10, .7);
    scrollEvent_Content11_1(content11, .7);
    scrollEvent_Content13_1(content13, .7);
    scrollEvent_Content16_1(content16, .2);
    scrollEvent_Content16_2(content16, .3);
    scrollEvent_Content19_1(content19, .5);
    scrollEvent_Content22_1(content22, .5);
    scrollEvent_Content23_1(content23, .5);
    scrollEvent_Content24_1(content24, .5);
});