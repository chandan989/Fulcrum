import { useState, useEffect } from 'react';
import { CasperService } from '@/lib/casper';
import { toast } from 'sonner';

export function useCasper() {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const checkConnection = async () => {
        let retries = 0;
        const maxRetries = 10;

        const check = async () => {
            const helper = (window as any).casperlabsHelper;
            const walletProvider = (window as any).CasperWalletProvider;

            console.log(`[Casper] Checking for wallet... Attempt ${retries + 1}. Legacy: ${!!helper}, New: ${!!walletProvider}`);

            if (helper || walletProvider) {
                try {
                    const isConnected = await CasperService.isWalletConnected();
                    console.log(`[Casper] Connected status: ${isConnected}`);

                    if (isConnected) {
                        let key;
                        if (walletProvider) {
                            key = await walletProvider().getActivePublicKey();
                        } else {
                            key = await helper.getActivePublicKey();
                        }

                        console.log(`[Casper] Active Key: ${key}`);
                        setPublicKey(key);
                        setIsConnected(true);
                        return; // Done
                    }
                } catch (e) {
                    console.error("[Casper] Error checking connection:", e);
                }
            }

            retries++;
            if (retries < maxRetries) {
                setTimeout(check, 500); // Retry every 500ms
            }
        };

        check();
    };

    useEffect(() => {
        // Initial check
        checkConnection();

        // Listen for extension injection event (some versions emit this)
        const handleInit = () => {
            console.log("[Casper] casper:initialized event received");
            checkConnection();
        };

        window.addEventListener('casper:initialized', handleInit);
        window.addEventListener('casper:locked', handleDisconnect);
        window.addEventListener('casper:unlocked', checkConnection);
        window.addEventListener('casper:activeKeyChanged', checkConnection);

        return () => {
            window.removeEventListener('casper:initialized', handleInit);
            window.removeEventListener('casper:locked', handleDisconnect);
            window.removeEventListener('casper:unlocked', checkConnection);
            window.removeEventListener('casper:activeKeyChanged', checkConnection);
        };
    }, []);

    const connect = async () => {
        try {
            const key = await CasperService.connectWallet();
            setPublicKey(key);
            setIsConnected(true);
            toast.success("Casper Wallet Connected", {
                description: `Account: ${key.slice(0, 10)}...`
            });
        } catch (error) {
            console.error("Connection failed:", error);
            toast.error("Connection Failed", {
                description: "Could not connect to Casper Wallet. Is it installed?"
            });
        }
    };

    const handleDisconnect = () => {
        setPublicKey(null);
        setIsConnected(false);
    };

    return { publicKey, isConnected, connect, disconnect: handleDisconnect };
}
