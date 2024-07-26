"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./taskModal/TaskModal";

export default function AddNewTodo() {

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    return (
        <div className="mt-6 ">
            <button className="w-full bg-light-yellow py-6 px-6 rounded-2xl text-start font-bold flex gap-3 items-center"
                onClick={handleButtonClick}
            >
                <div className="bg-orange rounded-2xl w-12 h-12 flex justify-center items-center">
                    <Image
                        src="/images/Add_round_duotone.svg"
                        alt="Plus"
                        width={25}
                        height={25}
                    />
                </div>
                Add new task
            </button>
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} />
        </div>
    );
        
}