var $pager = function (targetElement) {
    var $this = this;
    this.PageSizeList = new Array(10, 20, 30, 40, 50);
    this.totalRecords = 100;
    this.MaxPageNumber = 10;
    this.pageSize = null;
    this.currentPageNumber = 1;
    this.targetElement = targetElement;
    this.firstButtonText = "First";
    this.previousButtonText = "Previous";
    this.nextButtonText = "Next";
    this.lastButtonText = "Last";
    this.onPageChanged = null;
    this.onPageSizeChanged = null;
    this.Create = function () {
        if ($this.pageSize == null) {
            $this.pageSize = this.PageSizeList[0];

        }


        targetElement.innerHTML = "";

        var f = AddLink($this.firstButtonText, targetElement);
        f.onclick = function () {

            $this.currentPageNumber = 1;

            $this.Create();
            if ($this.onPageChanged != null) {
                $this.onPageChanged();
            }

        }
        var p = AddLink($this.previousButtonText, targetElement);
        p.onclick = function () {
            if ($this.currentPageNumber > 1) {
                $this.currentPageNumber--;

                $this.Create();
                if ($this.onPageChanged != null) {
                    $this.onPageChanged();
                }
            }
        }

        var totalButton = this.totalRecords % this.pageSize > 0 ? parseInt(this.totalRecords / this.pageSize) + 1 : parseInt(this.totalRecords / this.pageSize);
        var startNumber = 1;
        if (parseInt($this.currentPageNumber % this.MaxPageNumber) > 0) {
            startNumber = (parseInt($this.currentPageNumber / this.MaxPageNumber) * this.MaxPageNumber) + 1;
        }
        else {
            if (parseInt($this.currentPageNumber % this.MaxPageNumber) == 0) {
                startNumber = ((parseInt($this.currentPageNumber / this.MaxPageNumber) * this.MaxPageNumber)) - (this.MaxPageNumber-1);
            }
            else {
                startNumber = (parseInt($this.currentPageNumber / this.MaxPageNumber) * this.MaxPageNumber);
            }
        }

        for (var i = startNumber; i <= totalButton; i++) {
            if (i >= startNumber + this.MaxPageNumber) {
                break;
            }
            var a = AddLink(i, targetElement);
            if (i != this.currentPageNumber) {
                a.onclick = function () {
                    $this.currentPageNumber = this.innerHTML;

                    $this.Create();
                    if ($this.onPageChanged != null) {
                        $this.onPageChanged();
                    }
                }
            }
            else {
                a.className = "selectedpage"
            }


        }

        var n = AddLink($this.nextButtonText, targetElement);
        n.onclick = function () {
            if (($this.totalRecords / $this.pageSize) > $this.currentPageNumber && $this.currentPageNumber < startNumber + $this.MaxPageNumber) {
                $this.currentPageNumber++;
                $this.Create();
                if ($this.onPageChanged != null) {
                    $this.onPageChanged();
                }
            }


        }
        var l = AddLink($this.lastButtonText, targetElement);
        l.onclick = function () {
            $this.currentPageNumber = totalButton;
            
            $this.Create();
            if ($this.onPageChanged != null) {
                $this.onPageChanged();
            }

            

        }

        var s = document.createElement("select");
        for (var i = 0; i < $this.PageSizeList.length; i++) {
            var o = document.createElement("option")
            o.text = $this.PageSizeList[i];
            o.value = $this.PageSizeList[i];
            s.options.add(o);
            if ($this.pageSize == $this.PageSizeList[i]) {
                o.selected = true;
            }
        }
        s.onchange = function () {
            $this.pageSize = this.value;
            $this.currentPageNumber = 1;
            $this.Create();
            if ($this.onPageSizeChanged != null) {
                $this.onPageSizeChanged();
            }
        }
        targetElement.appendChild(s);


        var lbl = document.createElement("span");
        lbl.innerHTML = "Page " + $this.currentPageNumber + " of " + totalButton;
        targetElement.appendChild(lbl);
    }


    function AddLink(text, targetElement) {
        var a = document.createElement("a");
        a.innerHTML = text;
        a.style.padding = "10px";
        a.href = "javascript:void(0)";
        targetElement.appendChild(a);
        return a;
    }


}

