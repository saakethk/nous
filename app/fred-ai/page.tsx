"use client"

import { User, Link, Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { CardHeader, CardFooter, Divider, Image } from "@heroui/react";
import { FredAIIntro, Holdings, Orders, Updates } from "@/components/fred-ai-components";

export default function FredAI() {
    return (
        <section className="fred_ai_content">
            <FredAIIntro />
            <div className="fred_ai_posts">
                <Tabs aria-label="Options" radius="none" color="primary">
                    <Tab key="posts" title="Posts">
                        <Updates />
                    </Tab>
                    <Tab key="orders" title="Orders">
                        <Orders />
                    </Tab>
                    <Tab key="holdings" title="Holdings">
                        <Holdings />
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}