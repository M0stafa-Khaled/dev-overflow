"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { KeyboardEvent, useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("../editor"), { ssr: false });

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (field.value.length >= 3) {
        form.setError("tags", {
          type: "manual",
          message: "You can only add up to 3 tags.",
        });
        return;
      }

      if (
        tagInput.length > 0 &&
        tagInput.length < 15 &&
        !field.value.includes(tagInput)
      ) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else {
        if (field.value.includes(tagInput)) {
          form.setError("tags", {
            type: "manual",
            message: "Tag already exists.",
          });
        } else if (tagInput.length > 15) {
          form.setError("tags", {
            type: "manual",
            message: "Tag should be less than 15 characters.",
          });
        } else {
          form.setError("tags", {
            type: "manual",
            message: "Tag should be at least 1 character.",
          });
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    form.setValue(
      "tags",
      field.value.filter((t) => t !== tag)
    );
    form.clearErrors("tags");
  };

  const handleCreateQuestion = async () => {};

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium text-dark400_light800">
                Qustion Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="What do you want to ask?"
                  type={"text"}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 rounded-1.5 border"
                />
              </FormControl>
              <FormDescription>
                Be specific and imagine you&apos;re asking a question to be
                another person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  fieldChange={field.onChange}
                  editorRef={editorRef}
                />
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"tags"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-medium text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    placeholder="Add tags..."
                    type={"text"}
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 rounded-1.5 border"
                  />
                  {field.value?.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field.value?.map((tag) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          isButton
                          remove
                          compact
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-16">
          <Button type="submit" className="primary-gradient text-light-900!">
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
