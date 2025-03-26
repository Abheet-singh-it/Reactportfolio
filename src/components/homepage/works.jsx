// c:\Users\Asus\OneDrive\Documents\Portfolio\reactfolio\src\components\homepage\works.jsx

import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import "./styles/works.css";

const Works = () => {
    return (
        <div className="works">
            <Card
                icon={faBriefcase}
                title="Work"
                body={
                    <div className="works-body">
                        <div className="work">
                            <img
                                src="https://imagedelivery.net/ywtNy772PWwXecPtq2-tAQ/ac4c9d35-39ea-4722-ecb3-cc3db1a24000/quality=100"
                                alt="AIGC Gaming"
                                className="work-image"
                            />
                            <div className="work-title">AIGC GAMING PRIVATE LIMITED</div>
                            <div className="work-subtitle">
                                AI-Driven Game Developer
                            </div>
                            <div className="work-duration">August 2023 - Present</div>
                        </div>

                        <div className="work">
                            <img
                                src="https://imagedelivery.net/ywtNy772PWwXecPtq2-tAQ/ac4c9d35-39ea-4722-ecb3-cc3db1a24000/quality=100"
                                alt="Acmegrade"
                                className="work-image"
                            />
                            <div className="work-title">Acmegrade</div>
                            <div className="work-subtitle">
                                Cyber Security
                            </div>
                            <div className="work-duration">January 2024 - February 2024</div>
                        </div>

                        <div className="work">
                            <img
                                src="https://imagedelivery.net/ywtNy772PWwXecPtq2-tAQ/ac4c9d35-39ea-4722-ecb3-cc3db1a24000/quality=100"
                                alt="SIF Homes"
                                className="work-image"
                            />
                            <div className="work-title">SIF HOMES TECHNOLOGIES</div>
                            <div className="work-subtitle">
                                Minecraft Game Server Development
                            </div>
                            <div className="work-duration">November 2022 - July 2023</div>
                        </div>

                        <div className="work">
                            <img
                                src="https://imagedelivery.net/ywtNy772PWwXecPtq2-tAQ/ac4c9d35-39ea-4722-ecb3-cc3db1a24000/quality=100"
                                alt="Freelancing"
                                className="work-image"
                            />
                            <div className="work-title">Freelancing</div>
                            <div className="work-subtitle">
                                Website Development
                            </div>
                            <div className="work-duration">January 2021 - January 2023</div>
                        </div>

                        <div className="work">
                            <img
                                src="https://imagedelivery.net/ywtNy772PWwXecPtq2-tAQ/ac4c9d35-39ea-4722-ecb3-cc3db1a24000/quality=100"
                                alt="Systematic Solutions"
                                className="work-image"
                            />
                            <div className="work-title">Systematic Solutions</div>
                            <div className="work-subtitle">
                                Trainee Web Developer
                            </div>
                            <div className="work-duration">March 2021 - July 2021</div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Works;