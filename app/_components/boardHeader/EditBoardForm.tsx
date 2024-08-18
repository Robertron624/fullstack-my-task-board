import React from 'react'


import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { API_URL } from '@/app/config/config';

const updateBoard = async (boardId: string, data: EditBoardFormValues) => {
    const url = `${API_URL}boards/${boardId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update board');
        }

        return await response.json();
    }
    catch (error: any) {
        throw new Error(error);
    }
};


interface EditBoardFormValues {
    name: string;
    description?: string;
};

interface EditBoardFormProps {
    onCloseModal: () => void;
    boardData: { name: string; description?: string; _id: string };
    }

export default function EditBoardForm ({ onCloseModal, boardData }: EditBoardFormProps) {

    const router = useRouter();

    const { register, handleSubmit } = useForm<EditBoardFormValues>({
        defaultValues: {
            name: boardData.name,
            description: boardData.description,
        },
    });

    const onSubmit: SubmitHandler<EditBoardFormValues> = async (data) => {
        try {
            await updateBoard(boardData._id, data);
            onCloseModal();
            toast.success('Board updated successfully');
            router.refresh();
        }
        catch (error: any) {
            toast.error('Failed to update board');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='name' className='text-lg'>Board name</label>
                    <input
                        type='text'
                        id='name'
                        className='p-2 border border-light-gray rounded-lg'
                        {...register('name')}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='description' className='text-lg'>Board description</label>
                    <textarea
                        id='description'
                        className='p-2 border border-light-gray rounded-lg'
                        {...register('description')}
                    />
                </div>
                <div className='flex justify-end gap-4'>
                    <button
                        type='button'
                        onClick={onCloseModal}
                        className='py-2 px-5 border border-light-gray rounded-lg duration-300 bg-transparent hover:bg-red hover:text-white'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='py-2 px-5 border border-light-gray rounded-lg duration-300 bg-transparent hover:bg-blue hover:text-white'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
