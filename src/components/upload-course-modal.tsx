import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useMockCourses } from "@/hooks/useMockCourses";
import { FaCloudUploadAlt, FaCheck, FaSpinner } from "react-icons/fa";

const courseSchema = z.object({
  semester: z.string().min(1, "Semester is required"),
  subjectName: z.string().min(1, "Subject name is required"),
  description: z.string().min(1, "Description is required"),
  fileUrl: z.string().url("Please enter a valid URL"),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface UploadCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadCourseModal({ open, onOpenChange }: UploadCourseModalProps) {
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { createCourse } = useMockCourses();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      semester: "",
      subjectName: "",
      description: "",
      fileUrl: "",
      status: "active",
    },
  });

  const validateUrl = async () => {
    const url = form.getValues("fileUrl");
    if (!url) return;

    setIsValidatingUrl(true);
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        toast({
          title: "Success",
          description: "URL is valid and accessible",
        });
      } else {
        toast({
          title: "Warning",
          description: "URL may not be accessible",
        //   variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate URL",
        // variant: "destructive",
      });
    } finally {
      setIsValidatingUrl(false);
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      await createCourse(data);
      toast({
        title: "Success",
        description: "Course uploaded successfully!",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload course",
        // variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const semesters = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Semester <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {semesters.map((semester) => (
                          <SelectItem key={semester.value} value={semester.value}>
                            {semester.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pharmacology I" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Provide a detailed description of the course content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PDF/File URL <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="https://example.com/course-material.pdf"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={validateUrl}
                      disabled={isValidatingUrl || !field.value}
                    >
                      {isValidatingUrl ? (
                        <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <FaCheck className="mr-2 h-4 w-4" />
                      )}
                      Validate
                    </Button>
                  </div>
                  <FormMessage />
                  <p className="text-sm text-gray-500">
                    Ensure the URL is publicly accessible and points to a valid PDF or document file.
                  </p>
                </FormItem>
              )}
            />

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
              <div className="space-y-2">
                <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400" />
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-primary cursor-pointer hover:underline">
                    Click to upload
                  </span>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Course"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
