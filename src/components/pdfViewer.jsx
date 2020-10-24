import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";

import CustomSkeleton from "./customSkeleton";
import { Button, Grid } from "@material-ui/core";

export default function MyPdfViewer(props) {
  const { documentURL } = props;
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: documentURL,
    page,
    canvasRef,
  });

  return (
    <Grid container justify="center">
      <Grid item xs={11} sm={10} md={8}>
        {!pdfDocument && <CustomSkeleton />}
        <canvas ref={canvasRef} />
        {Boolean(pdfDocument && pdfDocument.numPages) && (
          <nav>
            <Grid container justify="space-between">
              <Button
                color="secondary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                previous
              </Button>
              <Button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                next
              </Button>
            </Grid>
          </nav>
        )}
      </Grid>
    </Grid>
  );
}
