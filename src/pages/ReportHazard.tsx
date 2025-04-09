
import { useState } from 'react';
import { Camera, MapPin, FileText, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const ReportHazard = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReports, setSubmittedReports] = useState([
    {
      id: 'HR-2023-001',
      type: 'Electrical',
      location: 'Computer Lab 3',
      status: 'Resolved',
      date: '2023-04-02'
    },
    {
      id: 'HR-2023-002',
      type: 'Chemical',
      location: 'Chemistry Lab',
      status: 'Under Review',
      date: '2023-04-05'
    },
    {
      id: 'HR-2023-003',
      type: 'Blocked Exit',
      location: 'Main Building Exit',
      status: 'Pending',
      date: '2023-04-08'
    }
  ]);

  const [formData, setFormData] = useState({
    hazardType: 'electrical',
    location: '',
    description: '',
    photo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      hazardType: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReport = {
        id: `HR-2023-00${submittedReports.length + 1}`,
        type: formData.hazardType,
        location: formData.location,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      };
      
      setSubmittedReports([newReport, ...submittedReports]);
      
      // Reset form
      setFormData({
        hazardType: 'electrical',
        location: '',
        description: '',
        photo: null
      });
      
      setIsSubmitting(false);
      
      toast({
        title: "Hazard Report Submitted",
        description: `Your report has been submitted with ID: ${newReport.id}`,
        variant: "default",
      });
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Report a Fire Hazard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Hazard Report Form</CardTitle>
              <CardDescription>
                Please provide details about the fire hazard you've observed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Hazard Type</Label>
                  <RadioGroup 
                    value={formData.hazardType} 
                    onValueChange={handleRadioChange}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="electrical" id="electrical" />
                      <Label htmlFor="electrical">Electrical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chemical" id="chemical" />
                      <Label htmlFor="chemical">Chemical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open-flame" id="open-flame" />
                      <Label htmlFor="open-flame">Open Flame</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex">
                    <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Building name, floor, room number"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="photo">Upload Photo (Optional)</Label>
                  <div className="flex items-center">
                    <Label 
                      htmlFor="photo" 
                      className="flex items-center justify-center w-full h-12 px-4 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50"
                    >
                      <Camera className="mr-2 h-5 w-5 text-gray-400" />
                      <span>{formData.photo ? formData.photo.name : 'Choose photo'}</span>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="flex">
                    <FileText className="mr-2 h-5 w-5 text-gray-400 mt-2" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Please provide details about the hazard"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-5 w-5" />
                      Submit Report
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Submitted Reports</CardTitle>
              <CardDescription>
                Track the status of your hazard reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedReports.length > 0 ? (
                  submittedReports.map((report) => (
                    <div 
                      key={report.id} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{report.id}</p>
                          <p className="text-sm text-gray-600">
                            {report.type} hazard at {report.location}
                          </p>
                          <p className="text-xs text-gray-500">Reported on {report.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <CheckCircle className="mx-auto h-10 w-10 mb-2" />
                    <p>No reports submitted yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;
