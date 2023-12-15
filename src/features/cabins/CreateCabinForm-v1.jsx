import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRowBtn = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const quaryClint = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      quaryClint.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        mutate({ ...data, image: data.image[0] }),
      )}
    >
      <FormRow labal="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow labal="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow labal="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 10,
              message: "Regular Price should be at least 10",
            },
          })}
        />
      </FormRow>

      <FormRow labal="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        labal="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow labal="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRowBtn>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRowBtn>
    </Form>
  );
}

export default CreateCabinForm;
