async function loader({ params }) {
    const packageLocationPromise = getPackageLocation(
        params.packageId
    );

    return defer({
        packageLocation: packageLocationPromise,
    });
}

export default function PackageRoute() {
    const data = useLoaderData();

    return (
        <main>
            <h1>Let's locate your package</h1>
            <React.Suspense
                fallback={<p>Loading package location...</p>}
            >
                <Await
                    resolve={data.packageLocation}
                    errorElement={
                        <p>Error loading package location!</p>
                    }
                >
                    {(packageLocation) => (
                        <p>
                            Your package is at {packageLocation.latitude}{" "}
                            lat and {packageLocation.longitude} long.
                        </p>
                    )}
                </Await>
            </React.Suspense>
        </main>
    );
}
