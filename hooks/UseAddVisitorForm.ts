import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

import { Visitor } from '../models';
import { RootState } from '../stores';
import { setVisitors } from '../stores/slices/OrderSlice';

type FormValues = {
  visitors: Visitor[];
};

const FormSchema = z.object({
  visitors: z
    .object({
      title: z.enum(['Mr', 'Ms']),
      name: z.string().min(1),
    })
    .array(),
});

export const useAddVisitorForm = () => {
  // * Stores
  const dispatch = useDispatch();
  const initialVisitors = useSelector((state: RootState) => state.order.visitors);
  const defaultVisitors: Visitor[] =
    initialVisitors.length > 0 ? initialVisitors : [{ title: 'Mr', name: '' }];

  // * Form
  const form = useForm<FormValues>({
    defaultValues: {
      visitors: defaultVisitors,
    },
    resolver: zodResolver(FormSchema),
  });
  const { control, formState, handleSubmit } = form;
  const { isValid } = formState;

  const fieldArray = useFieldArray({
    name: 'visitors',
    control,
  });
  const { append, fields, remove } = fieldArray;

  // * Actions
  const onAddVisitor = () => append({ name: '', title: 'Mr' });

  const onSaveVisitors = (values: FormValues) => {
    if (!isValid) {
      alert('Lengkapi nama tamu');
      return;
    }

    dispatch(setVisitors(values.visitors));

    router.back();
  };

  const onRemoveVisitor = (index: number) => remove(index);

  return { control, fields, onAddVisitor, handleSubmit, onSaveVisitors, onRemoveVisitor };
};
