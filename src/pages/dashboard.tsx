import { useState, useEffect } from "react";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useMockCourses } from "@/hooks/useMockCourses";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "@/components/sidebar";
import UploadCourseModal from "@/components/upload-course-modal";
import DeleteConfirmationModal from "@/components/delete-confirmation-modal";
import {
  FaBook,
  FaCalendar,
  FaFilePdf,
  FaClock,
  FaSearch,
  FaFilter,
  FaPlus,
  FaBell,
  FaEye,
  FaEdit,
  FaTrash,
  FaPills,
  FaMicroscope,
  FaFlask,
  FaCheck,
} from "react-icons/fa";
import type { Course } from "@/data/mockData";
import { useAuth } from "../hooks/useAuth";
import { getCoursesByUser } from "../services/courseService";
import { Avatar } from "@radix-ui/react-avatar";


export default function Dashboard() {
  const [currentView, setCurrentView] = useState("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useMockAuth();
  const { 
    // courses, 
    isLoading: 
    coursesLoading 
} = useMockCourses();

   const { user, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [actionType, setActionType] = useState("create");
  const [currentId, setCurrentId] = useState<Course | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const data = await getCoursesByUser(user?.uid || "");
      // Ensure each item matches the Course type
      // console.log(data);
      
      const courses: Course[] = data.map((item: any) => ({
        id: item.id,
        semester: item.semester,
        subjectName: item.subjectName,
        description: item.description,
        fileUrl: item.fileUrl,
        status: item.status,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
        // add any other Course fields as needed
    }));
    // console.log(courses);
      setCourses(courses);
    })();
  }, [loading, user]);

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete({ id: course.id, name: course.subjectName });
    setDeleteModalOpen(true);
  };

  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch =
      course.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      !semesterFilter ||
      semesterFilter === "all" ||
      course.semester === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  const stats = {
    totalCourses: courses.length,
    activeSemesters: [...new Set(courses.map((c: Course) => c.semester))]
      .length,
    pdfMaterials: courses.filter((c: Course) =>
      c.fileUrl.toLowerCase().includes(".pdf")
    ).length,
    lastUpdated: courses.length > 0 ? "2 hours ago" : "Never",
  };

  const getCourseIcon = (subjectName: string) => {
    const name = subjectName.toLowerCase();
    if (name.includes("pharmacology") || name.includes("pharmacy"))
      return FaPills;
    if (name.includes("chemistry")) return FaMicroscope;
    if (name.includes("clinical")) return FaFlask;
    return FaBook;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <FaCheck className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            <FaClock className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative overflow-y-auto min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 justify-end absolute w-4/5 right-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white top-0 sticky w-full z-20 shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentView === "courses" ? "Course Management" : "Dashboard"}
              </h1>
              <div className="flex bg-white items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <FaBell className="h-4 w-4" />
                </Button>
                <Button onClick={() => setUploadModalOpen(true)}>
                  <FaPlus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
                <Avatar>
                    <img
                        src={user?.photoURL || "/default-avatar.png"}
                        alt={user?.displayName || "User Avatar"}
                        className="h-8 w-8 rounded-full"
                    />
                    <span className="sr-only">
                        {user?.displayName || "User Avatar"}
                    </span>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto p-6 ">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pt-24">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <FaBook className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Courses
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalCourses}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <FaCalendar className="text-green-600 h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Active Semesters
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.activeSemesters}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FaFilePdf className="text-yellow-600 h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      PDF Materials
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.pdfMaterials}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <FaClock className="text-purple-600 h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Last Updated
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {stats.lastUpdated}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6 ">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative border-gray-500 rounded-lg">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <Select
                    value={semesterFilter}
                    onValueChange={setSemesterFilter}
                  >
                    <SelectTrigger className="w-48 rounded border-gray-500">
                      <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-50">
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                      <SelectItem value="3">Semester 3</SelectItem>
                      <SelectItem value="4">Semester 4</SelectItem>
                      <SelectItem value="5">Semester 5</SelectItem>
                      <SelectItem value="6">Semester 6</SelectItem>
                      <SelectItem value="7">Semester 7</SelectItem>
                      <SelectItem value="8">Semester 8</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <FaFilter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses Table */}
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Course Materials
              </h3>
            </div>

            <div className="overflow-y-auto ">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Details</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coursesLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-lg mr-4" />
                            <div>
                              <Skeleton className="h-4 w-32 mb-2" />
                              <Skeleton className="h-3 w-48" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredCourses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-gray-500">
                          {searchTerm || semesterFilter
                            ? "No courses match your filters"
                            : "No courses found"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course: Course) => {
                      const IconComponent = getCourseIcon(course.subjectName);
                      return (
                        <TableRow key={course.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
                                  <IconComponent className="text-primary h-5 w-5" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {course.subjectName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {course.description}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-300"
                            >
                              Semester {course.semester}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(course.status || "active")}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(course.updatedAt!).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:text-blue-700 hover:bg-blue-50"
                              >
                                <FaEye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                 onClick={() => {
                                    setUploadModalOpen(true);
                                    setActionType("edit");
                                    setCurrentId(course);}}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <FaEdit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteCourse(course)}
                              >
                                <FaTrash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">
                    {Math.min(filteredCourses.length, 10)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredCourses.length}</span>{" "}
                  results
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button size="sm">1</Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Modals */}
      <UploadCourseModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        type={actionType}
        course={currentId}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        courseId={courseToDelete?.id || null}
        courseName={courseToDelete?.name || ""}
      />
    </div>
  );
}
