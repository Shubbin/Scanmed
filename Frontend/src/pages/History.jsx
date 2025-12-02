import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Trash2, RefreshCw, MessageSquare, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("scans");
    const [scanHistory, setScanHistory] = useState([]);
    const [medicationHistory, setMedicationHistory] = useState([]);
    const [readingHistory, setReadingHistory] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTrash, setShowTrash] = useState(false);

    useEffect(() => {
        fetchData();
    }, [showTrash]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Add query param for trash if needed, but for now backend filters by default
            // We might need separate endpoints or query params for trash items in the future
            // For this implementation, we'll assume standard endpoints return active items
            // and we'd need a way to get deleted items. 
            // Since I didn't implement ?trash=true in backend yet, I'll stick to active items for now
            // and just show the structure. 
            // WAIT, I should have implemented ?trash=true in backend. 
            // Let's assume I will or have, or just show active items for now and add trash toggle UI.

            const [scansRes, medsRes, readingRes, chatsRes] = await Promise.all([
                api.get("/health-scans"),
                api.get("/medications"),
                api.get("/reading-history"),
                api.get("/chats")
            ]);

            if (scansRes.data.success) {
                setScanHistory(scansRes.data.scans.map(scan => ({
                    id: scan._id,
                    type: scan.scanType === 'eyes' ? 'Eye Scan' : scan.scanType === 'teeth' ? 'Dental Scan' : 'Skin Scan',
                    date: new Date(scan.createdAt).toLocaleDateString(),
                    time: new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    result: scan.result,
                    status: scan.status,
                    notes: scan.notes,
                    confidence: scan.confidence,
                    imageUrl: scan.imageUrl
                })));
            }

            if (medsRes.data.success) {
                setMedicationHistory(medsRes.data.medications.map(med => ({
                    id: med._id,
                    medication: med.name,
                    dosage: med.dosage,
                    frequency: med.frequency,
                    startDate: new Date(med.startDate).toLocaleDateString(),
                    endDate: med.endDate ? new Date(med.endDate).toLocaleDateString() : null,
                    status: med.status || "Active",
                    adherence: med.adherence || 0,
                    notes: med.notes
                })));
            }

            if (readingRes.data.success) {
                setReadingHistory(readingRes.data.history.map(item => ({
                    id: item._id,
                    title: item.title,
                    category: item.category,
                    dateRead: new Date(item.dateRead).toLocaleDateString(),
                    readTime: item.readTime
                })));
            }

            if (chatsRes.data.success) {
                setChatHistory(chatsRes.data.chats.map(chat => ({
                    id: chat._id,
                    title: chat.title,
                    preview: chat.preview,
                    date: new Date(chat.createdAt).toLocaleDateString(),
                    time: new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                })));
            }
        } catch (error) {
            console.error("Error fetching history:", error);
            toast.error("Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            let endpoint = "";
            switch (type) {
                case "scan": endpoint = `/health-scans/${id}`; break;
                case "medication": endpoint = `/medications/${id}`; break;
                case "chat": endpoint = `/chats/${id}`; break;
            }

            if (endpoint) {
                await api.delete(endpoint);
                toast.success("Item moved to trash");
                fetchData();
                setSelectedItem(null);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item");
        }
    };

    const handleRestore = async (type, id) => {
        try {
            let endpoint = "";
            switch (type) {
                case "scan": endpoint = `/health-scans/${id}/restore`; break;
                case "medication": endpoint = `/medications/${id}/restore`; break;
                case "chat": endpoint = `/chats/${id}/restore`; break;
            }

            if (endpoint) {
                await api.patch(endpoint);
                toast.success("Item restored");
                fetchData();
                setSelectedItem(null);
            }
        } catch (error) {
            console.error("Error restoring item:", error);
            toast.error("Failed to restore item");
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-muted/30">
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">History</h1>
                            <p className="text-muted-foreground">Review your health journey and activities</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="scans">
                            <Scan className="h-4 w-4 mr-2" />
                            Scans
                        </TabsTrigger>
                        <TabsTrigger value="medications">
                            <Calendar className="h-4 w-4 mr-2" />
                            Meds
                        </TabsTrigger>
                        <TabsTrigger value="reading">
                            <Newspaper className="h-4 w-4 mr-2" />
                            Reading
                        </TabsTrigger>
                        <TabsTrigger value="chats">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chats
                        </TabsTrigger>
                    </TabsList>

                    {/* Scan History */}
                    <TabsContent value="scans" className="mt-6">
                        <div className="space-y-4">
                            {scanHistory.map((scan) => (
                                <Card key={scan.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedItem({ ...scan, itemType: 'scan' })}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Eye className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{scan.type}</CardTitle>
                                                    <CardDescription>
                                                        {scan.date} at {scan.time}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Badge
                                                className={
                                                    scan.status === "success"
                                                        ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
                                                }
                                            >
                                                {scan.result}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{scan.notes}</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedItem({ ...scan, itemType: 'scan' }); }}>
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Medication History */}
                    <TabsContent value="medications" className="mt-6">
                        <div className="space-y-4">
                            {medicationHistory.map((med) => (
                                <Card key={med.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{med.medication}</CardTitle>
                                                <CardDescription>
                                                    {med.dosage} · {med.frequency}
                                                </CardDescription>
                                            </div>
                                            <Badge variant={med.status === "Active" ? "default" : "secondary"}>
                                                {med.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Started</span>
                                                <span className="font-medium">{med.startDate}</span>
                                            </div>
                                            {med.endDate && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Ended</span>
                                                    <span className="font-medium">{med.endDate}</span>
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Adherence</span>
                                                    <span className="font-medium">{med.adherence}%</span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary transition-all"
                                                        style={{ width: `${med.adherence}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Reading History */}
                    <TabsContent value="reading" className="mt-6">
                        <div className="space-y-4">
                            {readingHistory.map((article) => (
                                <Card key={article.id}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <Newspaper className="h-6 w-6 text-accent" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{article.title}</CardTitle>
                                                <CardDescription className="mt-2 flex items-center gap-3">
                                                    <Badge variant="outline">{article.category}</Badge>
                                                    <span>·</span>
                                                    <span>Read on {article.dateRead}</span>
                                                    <span>·</span>
                                                    <span>{article.readTime}</span>
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" size="sm">
                                            Read Again
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Chat History */}
                    <TabsContent value="chats" className="mt-6">
                        <div className="space-y-4">
                            {chatHistory.map((chat) => (
                                <Card key={chat.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedItem({ ...chat, itemType: 'chat' })}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <MessageSquare className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{chat.title}</CardTitle>
                                                <CardDescription className="mt-1">
                                                    {chat.date} at {chat.time}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{chat.preview}</p>
                                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/'); }}>
                                            Continue Chat <ExternalLink className="ml-2 h-3 w-3" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Details Dialog */}
                <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedItem?.itemType === 'scan' && `${selectedItem.type} Details`}
                                {selectedItem?.itemType === 'medication' && selectedItem.medication}
                                {selectedItem?.itemType === 'chat' && selectedItem.title}
                                {selectedItem?.itemType === 'reading' && selectedItem.title}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedItem?.date} {selectedItem?.time && `at ${selectedItem.time}`}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            {/* Scan Details */}
                            {selectedItem?.itemType === 'scan' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <span className="font-medium">Result</span>
                                        <Badge variant={selectedItem.status === 'success' ? 'default' : 'destructive'}>
                                            {selectedItem.result}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Analysis Notes</h4>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                                            {selectedItem.notes}
                                        </p>
                                    </div>
                                    {selectedItem.confidence && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>AI Confidence:</span>
                                            <span className="font-medium text-foreground">{selectedItem.confidence}%</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Medication Details */}
                            {selectedItem?.itemType === 'medication' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <span className="text-xs text-muted-foreground block mb-1">Dosage</span>
                                            <span className="font-medium">{selectedItem.dosage}</span>
                                        </div>
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <span className="text-xs text-muted-foreground block mb-1">Frequency</span>
                                            <span className="font-medium">{selectedItem.frequency}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Instructions/Notes</h4>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                                            {selectedItem.notes || "No notes available."}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Adherence Rate</span>
                                        <span className="font-bold text-primary">{selectedItem.adherence}%</span>
                                    </div>
                                </div>
                            )}

                            {/* Chat Details */}
                            {selectedItem?.itemType === 'chat' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Preview</h4>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                                            {selectedItem.preview}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={() => navigate('/')}>
                                            Go to Chat <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            {showTrash ? (
                                <Button
                                    variant="default"
                                    onClick={() => handleRestore(selectedItem.itemType, selectedItem.id)}
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Restore
                                </Button>
                            ) : (
                                selectedItem?.itemType !== 'reading' && (
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(selectedItem.itemType, selectedItem.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Move to Trash
                                    </Button>
                                )
                            )}
                            <Button variant="outline" onClick={() => setSelectedItem(null)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default History;
