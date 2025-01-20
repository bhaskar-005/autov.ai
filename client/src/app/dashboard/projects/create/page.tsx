"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, Upload, Video, Info, Layout, Eye, LoaderIcon, Loader } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNameSpace } from "@/zustand/nameSpaceState";
import { speechLanguage } from "@/contant/Projects.conf";
import { projectFormSchema } from "@/zod/projectSchema";
import { useProjectStore } from "@/zustand/projectState";

function YouTubeEmbed({ url }: { url: string }) {
  try {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    if (!videoId) return null;
    
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="border-0"
        />
      </div>
    );
  } catch {
    return null;
  }
}

function page() {
  const [view, setView] = useState<"form" | "preview">("form");
  let   namespaces = useNameSpace((state)=> state.nameSpace);
  const getNameSpace = useNameSpace((state)=> state.getNameSpace);
  const loadingNameSpace = useNameSpace((state)=> state.loading);
  const ProjectLoading = useProjectStore((state)=> state.loading);
  const createProject = useProjectStore((state)=> state.createProject);
 
 const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      is_auto_generated: true,
      auto_upload: false,
      number_of_clips: 3,
    },
  });

  const watchVideoUrl = form.watch("video_url");
  const watchAutoUpload = form.watch("auto_upload");

  function onSubmit(values: z.infer<typeof projectFormSchema>) {
    console.log(values);
    createProject(values);
  }
 
  useEffect(()=>{
    if (!namespaces || namespaces.length === 0) {
      getNameSpace(1); 
    }
  },[])
  console.log(namespaces, loadingNameSpace);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
      <div className="lg:hidden mb-6">
          <Tabs value={view} onValueChange={(v) => setView(v as "form" | "preview")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Project Info
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
           <Card className={cn(
            "backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl max-h-[85vh] overflow-y-auto",
             view === "preview" && "lg:block hidden"
            )}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center">
                Create New Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="project_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="project_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project (optional)"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Enter YouTube video URL" {...field} />
                            <Video className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name_space_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Namespace</FormLabel>
                          <Select
                            onValueChange={field.onChange} defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select namespace" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                             {
                             loadingNameSpace ?
                             ( <LoaderIcon className="animate-spin opacity-40 py-1"/>):(
                             <>
                             {namespaces?.map((namespace) => (
                                <SelectItem key={namespace.id} value={namespace.id.toString()}>
                                  {namespace.groupName}
                                </SelectItem>
                              ))}
                             </>
                             )} 
                           </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="speech_language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speech Language</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                speechLanguage.map((Lang)=>(
                                 <SelectItem value={Lang.Language}>{Lang.displayName}</SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="number_of_clips"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Clips</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={10}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Choose between 1 and 10 clips</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="is_auto_generated"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <FormLabel className="text-base">Auto Generation</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Currently, only auto-generated content is supported</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormDescription>Enable automatic content generation</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={true}
                              disabled={true}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="auto_upload"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Auto Upload</FormLabel>
                            <FormDescription>
                              Automatically upload content when ready
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {watchAutoUpload && (
                    <FormField
                      control={form.control}
                      name="upload_time"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Upload Time</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                    if (date) {
                                      const now = new Date();
                                      date.setHours(now.getHours());
                                      date.setMinutes(now.getMinutes());
                                      field.onChange(date.toISOString());
                                    }
                                  }}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Schedule upload time</FormDescription>
                          <FormMessage />
                          <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900">
                           <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                              Note: Video upload times may vary depending on processing requirements and server load.
                           </AlertDescription>
                          </Alert>
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit" className="w-full" disabled={ProjectLoading}>
                    {ProjectLoading ? (
                        <>
                         <Loader  className="mr-2 h-4 w-4 animate-spin opacity-70" /> Creating Project
                        </>
                    ):(
                        <>
                           <Upload className="mr-2 h-4 w-4" />
                           Create Project
                        </>
                    ) }
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className={cn(
            "space-y-8",
             view === "form" && "lg:block hidden"
            )}>
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Video Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {watchVideoUrl ? (
                  <YouTubeEmbed url={watchVideoUrl} />
                ) : (
                  <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Enter a YouTube URL to preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Selected Options:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Auto Generation: Enabled</li>
                    <li>Auto Upload: {watchAutoUpload ? 'Enabled' : 'Disabled'}</li>
                    <li>Number of Clips: {form.watch("number_of_clips")}</li>
                    {form.watch("speech_language") && (
                      <li>Language: {form.watch("speech_language")}</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;