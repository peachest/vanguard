import {Box, Card, CardContent, Tab, Tabs}        from "@mui/material";
import {JSX, ReactNode, SyntheticEvent, useState} from "react";
import {TabPanel}                                 from "src/components/atoms/tab-panel";

export interface BasicTabsProps<T extends string> {
    tabLabels: T[];
    renderContext: (tabLabel: T) => ReactNode;
}

export function BasicTabs<T extends string>(props: BasicTabsProps<T>): JSX.Element {
    const {tabLabels, renderContext} = props ;

    const [activeTab, setActiveTab] = useState(0) ;
    const handleChange = (event: SyntheticEvent, newValue: number): void => {
        setActiveTab(newValue) ;
    } ;

    return (
        <div style={{
            height: "100%",
        }}>
            <Card sx={{
                height: "100%",
            }}>
                <CardContent>
                    <Box sx={{width: "100%"}}>
                        <Box sx={{
                            borderBottom: 1,
                            borderColor : "divider",
                        }}>
                            <Tabs value={activeTab} onChange={handleChange}>
                                {
                                    tabLabels.map((tabLabel, index) => (
                                        <Tab label={tabLabel} key={tabLabel}/>
                                    ))
                                }
                            </Tabs>
                        </Box>
                        {
                            tabLabels.map((tabLabel, index) => (
                                <TabPanel value={activeTab} index={index} key={tabLabel}>
                                    {renderContext(tabLabel)}
                                </TabPanel>
                            ))
                        }
                    </Box>
                </CardContent>
            </Card>
        </div>
    ) ;
}
