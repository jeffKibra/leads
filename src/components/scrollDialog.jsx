import React, { forwardRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@material-ui/core";
import sanitizeHtml from "sanitize-html";
import { useRef } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScrollDialogue(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const draft = localStorage[props.draft];

  console.log(draft);

  const createMarkup = () => ({ __html: sanitizeHtml(draft) });

  const myComponent = () => {
    return <span dangerouslySetInnerHTML={createMarkup()}></span>;
  };

  const handleClickOpen = (scrollType) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    console.log(descriptionElementRef);
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      {props.render(() => handleClickOpen("paper"))}
      <Dialog
        fullScreen
        open={open}
        scroll={scroll}
        onClose={handleClose}
        aria-labelledby="scroll-dialog title"
        arial-describedby="scroll-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {myComponent()}
            {[...new Array(2)]
              .map(
                () => `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                iure minima. Perspiciatis accusamus id aut facilis cumque quasi
                porro architecto ab? Saepe nulla minima aspernatur eveniet porro
                nihil facere veniam!`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            endIcon={<FontAwesomeIcon icon="undo" />}
          >
            Restore
          </Button>
          <Button
            onClick={handleClose}
            endIcon={<FontAwesomeIcon icon="times" />}
          >
            cancel
          </Button>
        </DialogActions>
        <Typography>home sweet home!</Typography>
      </Dialog>
    </>
  );
}
